import datetime

from ..reservation.views import ReservationList
from django.core.mail import send_mail
from ..users.models import User


class CoronaSendMails():
    def searchPeople(self):
        sinceDay = 0 # TODO aus URL extrahieren
        user_id = 0  # TODO aus URL extrahieren
        for reservation in ReservationList().get_queryset():
            if reservation.user_id == user_id:
                if self._isInInfectionPeriod(reservation.start, sinceDay):
                    for other_reservation in ReservationList.get_queryset():
                        if reservation.user_id != other_reservation.user_id and self._isInfectionPeriod(other_reservation.start, sinceDay) and reservation.group_id == other_reservation.group_id: # TODO this line is waaaaaay to long
                            self.sendMailToUser(other_reservation.user_id)

    def _isInfectionPeriod(self, reservation_start, sinceDay):
        return reservation_start > datetime.date.today() - sinceDay

    def sendMailToUser(self, user_id):
        user = User.objects.get(username=user_id) # TODO ist user_id username?
        send_mail(
            'Corona Kontaktperson',
            'Dies ist eine Warnung. Durch eine Ihrer Reservierungen hatten Sie Kontakt mit einer nachweißlich Covid-positiven Person.',
            'support@bookadesk.de',
            [user.email],
            fail_silently=False,
        )