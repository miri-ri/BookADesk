import random

from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom User & Admin Model for OTP Field / OTP generation
class CustomUser(AbstractUser):
    otp = models.CharField(
        max_length=6, null=True, blank=True)

    # Method to Put a Random OTP in the CustomerUser
    def save(self, *args, **kwargs):
        number_list = [x for x in range(10)]
        code_items_for_otp = []

        for i in range(6):
            num = random.choice(number_list)
            code_items_for_otp.append(num)

        code_string = "".join(str(item)
                              for item in code_items_for_otp)
        # Six random numbers saved in OTP field from User after every use of save on the User, single use only
        self.otp = code_string
        super().save(*args, **kwargs)
