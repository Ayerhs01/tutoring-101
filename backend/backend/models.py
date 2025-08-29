from django.db import models

class Event(models.Model):
    id = models.IntegerField(primary_key=True) 
    event = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.id}: {self.event}"
