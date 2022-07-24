import random

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    otp = models.CharField(
        max_length=6, null=True, blank=True)

    # Method to Put a Random OTP in the CustomerUser table.
    def save(self, *args, **kwargs):
        number_list = [x for x in range(10)]  # Use of list comprehension
        code_items_for_otp = []

        for i in range(6):
            num = random.choice(number_list)
            code_items_for_otp.append(num)

        code_string = "".join(str(item)
                              for item in code_items_for_otp)  # list comprehension again
        # A six digit random number from the list will be saved in top field
        self.otp = code_string
        super().save(*args, **kwargs)
