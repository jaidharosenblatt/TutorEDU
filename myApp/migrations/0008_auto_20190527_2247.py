# Generated by Django 2.2.1 on 2019-05-27 22:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0007_auto_20190527_2153'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='profile_image',
        ),
        migrations.AddField(
            model_name='photo',
            name='image',
            field=models.ImageField(default='default-profile.png', null=True, upload_to='profile_image'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_image', to=settings.AUTH_USER_MODEL),
        ),
    ]