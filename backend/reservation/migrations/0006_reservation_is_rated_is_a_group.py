
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0005_reservation_seat_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='is_rated',
            field=models.BooleanField(),
        ),
        migrations.AddField(
            model_name='reservation',
            name='is_a_group',
            field=models.BooleanField(),
        )
    ]

