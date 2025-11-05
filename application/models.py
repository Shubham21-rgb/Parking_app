from .database import db
from flask_security import UserMixin, RoleMixin
from datetime import datetime

# ============================================
# 1. USER TABLE (Flask-Security)
# ============================================
class User(db.Model, UserMixin):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    phone_number = db.Column(db.String, nullable=True)
    created_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationships
    roles = db.relationship('Role', secondary='roles_users', backref='bearer')
    reservations = db.relationship('Reservation', backref='bearer', lazy='dynamic')
    payments = db.relationship('Payment', backref='bearer', lazy='dynamic')
    
    def __repr__(self):
        return f'<User {self.username}>'


# ============================================
# 2. ROLE TABLE (Flask-Security)
# ============================================
class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<Role {self.name}>'


# ============================================
# 3. ROLES-USERS ASSOCIATION TABLE
# ============================================
class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'role_id', name='unique_user_role'),
    )


# ============================================
# 4. PARKING LOT TABLE
# ============================================
class ParkingLot(db.Model):
    __tablename__ = 'parking_lot'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prime_location_name = db.Column(db.String, nullable=False)
    price_per_hour = db.Column(db.String, nullable=False)  # Store as string like in your example
    address = db.Column(db.String, nullable=False)
    pin_code = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=True)
    state = db.Column(db.String, nullable=True)
    number_of_spots = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.String, nullable=True)
    longitude = db.Column(db.String, nullable=True)
    operating_hours_start = db.Column(db.String, nullable=True, default='00:00')
    operating_hours_end = db.Column(db.String, nullable=True, default='23:59')
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    updated_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationships
    parking_spots = db.relationship('ParkingSpot', backref='lot', lazy='dynamic', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<ParkingLot {self.prime_location_name}>'


# ============================================
# 5. PARKING SPOT TABLE
# ============================================
class ParkingSpot(db.Model):
    __tablename__ = 'parking_spot'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lot_id = db.Column(db.Integer, db.ForeignKey('parking_lot.id'), nullable=False)
    spot_number = db.Column(db.String, nullable=False)  # e.g., "A-01", "B-15"
    status = db.Column(db.String, nullable=False, default='A')  # 'A' = Available, 'O' = Occupied
    floor_level = db.Column(db.Integer, nullable=True, default=0)
    spot_type = db.Column(db.String, nullable=True, default='regular')  # 'regular', 'premium', 'disabled'
    created_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationships
    reservations = db.relationship('Reservation', backref='spot', lazy='dynamic', cascade='all, delete-orphan')
    
    __table_args__ = (
        db.UniqueConstraint('lot_id', 'spot_number', name='unique_spot_per_lot'),
    )
    
    def __repr__(self):
        return f'<ParkingSpot {self.spot_number} - Status:{self.status}>'


# ============================================
# 6. RESERVATION TABLE
# ============================================
class Reservation(db.Model):
    __tablename__ = 'reservation'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    spot_id = db.Column(db.Integer, db.ForeignKey('parking_spot.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vehicle_number = db.Column(db.String, nullable=True)
    vehicle_type = db.Column(db.String, nullable=True, default='4-wheeler')
    parking_timestamp = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    leaving_timestamp = db.Column(db.String, nullable=True)
    parking_cost = db.Column(db.String, default='0')  # Store as string like your example
    payment_status = db.Column(db.String, nullable=False, default='pending')  # 'pending', 'paid', 'failed'
    payment_method = db.Column(db.String, nullable=True)  # 'cash', 'card', 'upi', 'wallet'
    booking_status = db.Column(db.String, nullable=False, default='active')  # 'active', 'completed', 'cancelled'
    created_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'spot_id', 'parking_timestamp', name='unique_reservation'),
    )
    
    def __repr__(self):
        return f'<Reservation {self.id} - User:{self.user_id} - Spot:{self.spot_id}>'


# ============================================
# 7. PAYMENT TABLE
# ============================================
class Payment(db.Model):
    __tablename__ = 'payment'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.String, nullable=False, default='0')
    payment_method = db.Column(db.String, nullable=False)  # 'cash', 'card', 'upi', 'wallet'
    transaction_id = db.Column(db.String, unique=True, nullable=True)
    payment_status = db.Column(db.String, nullable=False, default='pending')  # 'pending', 'success', 'failed'
    payment_date = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationships
    reservation = db.relationship('Reservation', backref='payment_info', uselist=False)
    
    def __repr__(self):
        return f'<Payment {self.id} - Amount:{self.amount} - Status:{self.payment_status}>'


# ============================================
# 8. RATINGS TABLE (For feedback on parking experience)
# ============================================
class Ratings(db.Model):
    __tablename__ = 'ratings'
    
    id = db.Column(db.Integer, db.ForeignKey('reservation.id'), primary_key=True)
    rating = db.Column(db.String, nullable=False)  # '1' to '5'
    review = db.Column(db.String, nullable=True)
    remarks = db.Column(db.String, nullable=True)
    created_at = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationship
    reservation = db.relationship('Reservation', backref='rating', uselist=False)
    
    def __repr__(self):
        return f'<Rating {self.rating}/5 for Reservation:{self.id}>'


'''# ============================================
# 9. AUDIT LOG TABLE (Optional - for tracking admin actions)
# ============================================
class AuditLog(db.Model):
    __tablename__ = 'audit_log'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    action = db.Column(db.String, nullable=False)  # 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
    entity_type = db.Column(db.String, nullable=False)  # 'ParkingLot', 'Reservation', 'User'
    entity_id = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    ip_address = db.Column(db.String, nullable=True)
    timestamp = db.Column(db.String, nullable=False, default=lambda: datetime.utcnow().isoformat())
    
    # Relationship
    user = db.relationship('User', backref='audit_logs')
    
    def __repr__(self):
        return f'<AuditLog {self.action} - {self.entity_type}:{self.entity_id}>'''