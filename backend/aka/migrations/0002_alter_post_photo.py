# Generated by Django 3.2.18 on 2023-03-07 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aka', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='photo',
            field=models.ImageField(upload_to='aka/post/%Y/%m/%d'),
        ),
    ]