from celery import shared_task
from .models import *
import time
import datetime
import csv
from .utils import format_report
from source.mail import send_email
import requests

def csv_report():
    """
    Generate a CSV file from Reservation data (completed/active bookings).
    Used by admin for exports.
    """
    # Query all completed reservations
    transactions = Reservation.query.all()

    # Dynamic filename
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    csv_file_name = f"reservations_{timestamp}.csv"
    csv_path = os.path.join("static", csv_file_name)

    # Ensure static folder exists
    os.makedirs("static", exist_ok=True)

    # Write CSV
    with open(csv_path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        # Header row
        writer.writerow([
            "Sr No.",
            "Reservation ID",
            "User Name",
            "Lot Name",
            "Spot Number",
            "Start Time",
            "End Time",
            "Vehicle Number",
            "Payment Method",
            "Payment Status",
            "Amount (₹)"
        ])

        # Data rows
        sr_no = 1
        for r in transactions:
            lot_name = r.spot.lot.prime_location_name if r.spot and r.spot.lot else "N/A"
            spot_no = r.spot.spot_number if r.spot else "N/A"
            username = r.bearer.username if r.bearer else "N/A"
            payment_method = r.payment_method or (r.payment_info.payment_method if hasattr(r, "payment_info") and r.payment_info else "N/A")
            payment_status = r.payment_status or (r.payment_info.payment_status if hasattr(r, "payment_info") and r.payment_info else "N/A")
            amount = r.parking_cost or (r.payment_info.amount if hasattr(r, "payment_info") and r.payment_info else "0")

            writer.writerow([
                sr_no,
                r.id,
                username,
                lot_name,
                spot_no,
                r.parking_timestamp,
                r.leaving_timestamp or "N/A",
                r.vehicle_number or "N/A",
                payment_method,
                payment_status,
                amount
            ])
            sr_no += 1

    return csv_file_name 


@shared_task(ignore_result=False, name="monthly_report")
def monthly_report():
    """
    Sends monthly SmartPark booking summary to all users who have
    made at least one booking during the current month.
    """
    now = datetime.utcnow()
    current_month = now.month
    current_year = now.year
    month_name = now.strftime("%B")

    users = User.query.all()
    sent_count = 0

    for user in users:
        # Skip admin accounts
        if any(role.name == "admin" for role in user.roles):
            continue

        # Get all user reservations for this month
        reservations = (
            Reservation.query
            .filter(
                Reservation.user_id == user.id,
                extract('month', Reservation.parking_timestamp) == current_month,
                extract('year', Reservation.parking_timestamp) == current_year
            )
            .all()
        )

        # Skip users with no bookings this month
        if not reservations:
            continue

        user_transactions = []
        total_amount = 0
        lot_counter = {}

        for r in reservations:
            lot_name = r.spot.lot.prime_location_name if r.spot and r.spot.lot else "N/A"
            lot_counter[lot_name] = lot_counter.get(lot_name, 0) + 1
            amount = float(r.payment_info.amount) if r.payment_info else 0
            total_amount += amount

            user_transactions.append({
                "lot_name": lot_name,
                "spot_number": r.spot.spot_number if r.spot else "N/A",
                "start": r.parking_timestamp,
                "end": r.leaving_timestamp or "N/A",
                "payment_method": r.payment_info.payment_method if r.payment_info else "N/A",
                "amount": amount
            })

        most_used_lot = max(lot_counter, key=lot_counter.get) if lot_counter else "N/A"

        # Data for the template
        context = {
            "username": user.username,
            "month_name": month_name,
            "year": current_year,
            "transactions": user_transactions,
            "most_used_lot": most_used_lot,
            "total_bookings": len(user_transactions)
        }

        # Render email HTML body
        html_message = render_template("mail_details.html", context)

        # Send email
        send_email(
            to_address=user.email,
            subject=f"📊 SmartPark Monthly Report - {month_name} {current_year}",
            html_body=html_message
        )

        sent_count += 1

    return f"✅ Monthly reports sent to {sent_count} users."


@shared_task(ignore_result=False,name="park_update")
def delivery_report(username):
    text=f"Hi {username},Check your Dasboard For the Changes From UNITY SERVICES"
    response=requests.post("https://chat.googleapis.com/v1/spaces/AAAAo_5okZk/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=0pUHMzXVfJXe6Ek4sPKqVQkihtDl33NviNw_yg_ZogA",json={"text":text})
    return"The Updated Details send to user"