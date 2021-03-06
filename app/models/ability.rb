class Ability
  include CanCan::Ability

  def initialize(user)
        user ||= User.new
        can :read, :all
        can :destroy,  Itinerary do |itinerary|
            itinerary.try(:owner_id) == user.id
        end
        can [:create, :destroy] , Point do |point|
            point.itinerary.try(:owner_id) == user.id
        end

        unless user.new_record?
          can :create, Itinerary
          can :create, Comment
        end
        can :participate, Itinerary do |itinerary|
          !user.new_record? && !user.participate?(itinerary)
        end
  end
end
