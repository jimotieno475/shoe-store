from app import db, User, Shoe

# Import the Flask app instance
from app import app  # Replace 'your_flask_app' with the actual name of your Flask app instance

# Create the Flask application context
with app.app_context():
    # Now you can perform operations that require the application context
    
    # Create the database tables
    db.create_all()

    # Delete existing records from the User and Shoe models
    db.session.query(User).delete()
    db.session.query(Shoe).delete()
    db.session.commit()

    # Seed data for the User model
    user1 = User(username='john_doe', password='hashed_password1', email='john_doe@example.com')
    user2 = User(username='jane_smith', password='hashed_password2', email='jane_smith@example.com')

    # Add users to the session and commit to the database
    db.session.add_all([user1, user2])
    db.session.commit()

    # Seed data for the Shoe model
    shoe1 = Shoe(image_url='https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/2/1/l/10-na-brd-980-10-birde-brown-original-imagzh38gpunrrhn.jpeg?q=70&crop=false', name='Running Shoe', brand="Nike",price=59.99, sizes='7;9;10')
    shoe2 = Shoe(image_url='https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/n/w/t/6-brd-406-brd-466-6-birde-grey-orange-green-original-imag5ccyzzwrwwfh.jpeg?q=70&crop=false', name='Casual Sneaker', brand="Jordan",price=39.99, sizes='8;9;11')

    # Add shoes to the session and commit to the database
    db.session.add_all([shoe1, shoe2])
    db.session.commit()

    # No need to close the database connection explicitly as it will be handled by the app context

# The application context will be automatically popped when the 'with' block is exited

