from ..reservation.views import ReservationList

# Workspace.objects.get(id=workspace_id)
class CoronaSendMails():
    def searchPeople(self):
        sinceDay = 0 # TODO aus URL extrahieren
        user_id = 0  # TODO aus URL extrahieren
        for reservation in ReservationList().get_queryset():
            if reservation.user_id == user_id:
                if self._isInInfectionPeriod(reservation.start, sinceDay):
                    for other_reservation in ReservationList.get_queryset():
                        if reservation.user_id != other_reservation.user_id and self._isInfectionPeriod(other_reservation.start, sinceDay) and reservation.group_id == other_reservation.group_id: # TODO this line is waaaaaay to long
                            sendMailToUser(other_reservation.user_id)

    def _isInfectionPeriod(self, reservation_start, sinceDay):
        return reservation_start > today() - sinceDay # TODO how to get current day?

    def sendMailToUser(self, user_id):
        pass
        # TODO