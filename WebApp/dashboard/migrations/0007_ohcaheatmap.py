# Generated by Django 3.2.7 on 2022-03-22 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0006_alter_ohca_subzone'),
    ]

    operations = [
        migrations.CreateModel(
            name='OhcaHeatMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jsonData', models.JSONField()),
            ],
        ),
    ]
