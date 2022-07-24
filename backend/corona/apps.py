import datetime

from ..reservation.views import ReservationList
from django.core.mail import send_mail
from accounts.models import CustomUser


class CoronaSendMails():
    def searchPeople(self, sinceDay, uname):
        for reservation in ReservationList().get_queryset():
            if reservation.username == uname:
                if self._isInInfectionPeriod(reservation.start, sinceDay):
                    for other_reservation in ReservationList.get_queryset():
                        if reservation.username != other_reservation.username and self._isInfectionPeriod(other_reservation.start, sinceDay) and reservation.group_id == other_reservation.group_id: # TODO this line is waaaaaay to long
                            self.sendMailToUser(other_reservation.username)

    def _isInfectionPeriod(self, reservation_start, sinceDay):
        return reservation_start > datetime.date.today() - sinceDay

    def sendMailToUser(self, uname):
        user = CustomUser.objects.get(username=uname) 
        send_mail(
            'Corona Kontaktperson',
            'Dies ist eine Warnung. Durch eine Ihrer Reservierungen hatten Sie Kontakt mit einer nachweißlich Covid-positiven Person.',
            'support@bookadesk.de',
            [user.email],
            fail_silently=False,
        )

