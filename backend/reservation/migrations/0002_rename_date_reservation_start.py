# Generated by Django 4.0.5 on 2022-06-26 16:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='date',
            new_name='start',
        ),
    ]
