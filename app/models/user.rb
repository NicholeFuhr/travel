class User < ActiveRecord::Base
  include Gravtastic
  gravtastic
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :first_name, :last_name
  attr_accessible :nickname, :provider, :url, :username, :avatar_url

  validates :first_name, :last_name, presence: true
  # attr_accessible :title, :body
  has_many :itineraries, through: :user_itineraries
  has_many :user_itineraries
  has_many :owned_itineraries,  foreign_key: :owner_id, class_name: 'Itinerary'
  def self.find_for_facebook_oauth access_token
    if user = User.where(:url => access_token.info.urls.Facebook).first
      user
    else 
      User.create!(:provider => access_token.provider, :url => access_token.info.urls.Facebook, :username => access_token.extra.raw_info.name, :nickname => access_token.extra.raw_info.username, :email => access_token.extra.raw_info.email, :password => Devise.friendly_token[0,20]) 
    end
  end

  def self.find_for_vkontakte_oauth access_token
    if user = User.where(:url => access_token.info.urls.Vkontakte).first
      user
    else
      User.create!(:provider => access_token.provider, :url => access_token.info.urls.Vkontakte, :username => access_token.info.name, :nickname => access_token.info.nickname, :email => access_token.extra.raw_info.screen_name + '@vk.com', :avatar_url => access_token.info.image, :password => Devise.friendly_token[0,20])
    end
  end

  def participate?(itinerary)
    self.itineraries.exists?(itinerary)
  end

  def fullname
    [first_name, last_name].join(' ')
  end
end
