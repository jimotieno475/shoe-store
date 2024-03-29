from flask import Flask,jsonify, request
from models import db,User,Shoe,CartItem
from flask_migrate import Migrate
from uuid import uuid4 



app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()


@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data['username']
    email=data['email']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify({'error': True, 'message': 'user already exists'}), 400
    new_user = User(username=username, email=email,password=password, )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'id': new_user.id, "name":new_user.username})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

   
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    
    if user.password != password:
        return jsonify({'error': 'Invalid password'}), 401

    
    user_details = {
        'id': user.id,
        'username': user.username,
        
    }

    return jsonify(user_details), 200

@app.route('/displayshoes', methods=['GET'])
def get_shoes():
    try:
        shoes = Shoe.query.all()
        shoe_list = []

        for shoe in shoes:
            shoe_info = {
                'id': shoe.id,
                'image': shoe.image_url,
                'brand': shoe.brand,
                'name': shoe.name,
                'price': shoe.price,
                'sizes': shoe.sizes,
            }
            shoe_list.append(shoe_info)

        return jsonify(shoe_list), 200

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error retrieving shoes: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    
# New route to get a single shoe by ID
@app.route('/displayshoes/<int:id>', methods=['GET'])
def get_single_shoe(id):
    try:
        shoe = Shoe.query.get(id)

        if shoe:
            shoe_info = {
                'id': shoe.id,
                'image': shoe.image_url,
                'brand': shoe.brand,
                'name': shoe.name,
                'price': shoe.price,
                'sizes': shoe.sizes,
            }
            return jsonify(shoe_info), 200
        else:
            return jsonify({'error': 'Shoe not found'}), 404

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error retrieving shoe by ID: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/shoe', methods=['POST'])
def create_shoe():
    data = request.get_json()
    image_url=data.get("image")
    brand=data["brand"]
    name = data['name']
    price=data['price']
    sizes= data['sizes']
    new_shoe = Shoe(image_url=image_url, brand=brand,name=name,price=price,sizes=sizes )
    db.session.add(new_shoe)
    db.session.commit()
    return jsonify({'id': new_shoe.id, "name":new_shoe.name,"brand":new_shoe.brand})

from flask import jsonify

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    shoe_id = data.get('shoe_id')

    if not user_id or not shoe_id:
        return jsonify({'error': 'User ID and Shoe ID are required'}), 400

    user = db.session.get(User, user_id)
    shoe = Shoe.query.get(shoe_id)

    if not user or not shoe:
        return jsonify({'error': 'User or Shoe not found'}), 404

    # Check if the item is already in the user's cart
    existing_cart_item = CartItem.query.filter_by(user_id=user.id, shoe_id=shoe.id, status='active').first()

    if existing_cart_item:
        return jsonify({'error': 'Item already in the cart'}), 400


    # Add the item to the cart with the unique ID
    new_cart_item = CartItem(user_id=user.id, shoe_id=shoe.id)
    db.session.add(new_cart_item)
    db.session.commit()

    return jsonify({'cart_item_id': new_cart_item.id, 'message': 'Item added to the cart successfully'}), 200

@app.route('/cartitems/<int:cart_item_id>', methods=['DELETE'])
def remove_cart_item(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)

    if not cart_item:
        return jsonify({'error': 'CartItem not found'}), 404

    # Check if the item is in an active status
    if cart_item.status != 'active':
        return jsonify({'error': 'Item not found in the cart'}), 404

    # Remove the item from the cart
    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Item removed from the cart successfully'}), 200

from flask import jsonify

@app.route('/cartitems/<int:user_id>', methods=['GET'])
def get_cart_items(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Retrieve the items in the user's cart
    cart_items = CartItem.query.filter_by(user_id=user.id, status='active').all()

    # Prepare the response data
    items_data = []
    for item in cart_items:
        shoe = Shoe.query.get(item.shoe_id)  # Fix here to use 'item.shoe_id'
        items_data.append({
            'shoe_id': item.shoe_id,
            'shoe_name': shoe.name,
            'shoe_image': shoe.image_url,
            'shoe_price': shoe.price,
            'shoe_sizes': shoe.sizes,
            # Add other details as needed
        })

    return jsonify({'cart_items': items_data}), 200

from flask import jsonify

# Existing code...

@app.route('/cartitems/<int:user_id>/<int:cart_item_id>', methods=['GET'])
def get_cart_item(user_id, cart_item_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Retrieve the cart item based on user_id and cart_item_id
    cart_item = CartItem.query.filter_by(user_id=user.id, id=cart_item_id, status='active').first()

    if not cart_item:
        return jsonify({'error': 'CartItem not found or not in the cart'}), 404

    # Retrieve the shoe details for the cart item
    shoe = Shoe.query.get(cart_item.shoe_id)

    if not shoe:
        return jsonify({'error': 'Shoe not found'}), 404

    # Prepare the response data
    id=cart_item_id
    item_data = {
        'shoe_id': cart_item.shoe_id,
        'shoe_name': shoe.name,
        'shoe_image': shoe.image_url,
        'shoe_price': shoe.price,
        'shoe_sizes': shoe.sizes,
        # Add other details as needed
    }

    return jsonify({'cart_item': item_data}), 200



if __name__ == '__main__':
    app.run(port=5555, debug=True)







