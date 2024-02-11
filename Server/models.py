from flask_sqlalchemy import SQLAlchemy
db=SQLAlchemy()

class  User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64),unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(128))
   

class Shoe(db.Model):
    __tablename__='shoes'
    id=db.Column(db.Integer,primary_key=True)
    image_url=db.Column(db.Text())
    brand=db.Column(db.String(30))
    name=db.Column(db.String(30),nullable=False)
    price=db.Column(db.Float,nullable=False)
    sizes=db.Column(db.String(5)) #example: "7;9;10

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shoe_id = db.Column(db.Integer, db.ForeignKey('shoes.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), default='active')  # 'active', 'cancelled', 'pending_payment'



    
