# Generated by Django 3.2.7 on 2021-09-19 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_auto_20210903_1447'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currentaedfile',
            name='data',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
