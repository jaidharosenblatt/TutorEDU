# Generated by Django 2.2.1 on 2019-06-17 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0009_auto_20190609_2206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='availabilities',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='bio',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='report_card',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='university',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='year',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]