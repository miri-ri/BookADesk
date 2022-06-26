from django.contrib import admin
from .models import Reservation

admin.site.register(Reservation)


# TODO: move this somewhere appropriate
from datetime   import datetime

from .models import Reservation

#reservation_1 = Reservation(res_id="id_1", user_id=1, seat_id=1, workspacename="workspace_1", start=datetime.now(), duration=2)
#reservation_1.save()
print("added an entry for reservations")