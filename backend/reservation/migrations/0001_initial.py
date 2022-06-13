# Generated by Django 3.2.13 on 2022-06-12 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('res_id', models.CharField(max_length=50)),
                ('username', models.CharField(max_length=20)),
                ('workspacename', models.CharField(max_length=5)),
                ('date', models.DateField()),
                ('slot', models.CharField(max_length=5)),
            ],
        ),
    ]
