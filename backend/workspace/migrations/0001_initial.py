# Generated by Django 4.0.5 on 2022-07-22 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Workspace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('comment', models.CharField(max_length=150)),
                ('is_barrier_free', models.BooleanField()),
                ('has_computer', models.BooleanField()),
                ('group', models.CharField(max_length=25)),
            ],
        ),
    ]
