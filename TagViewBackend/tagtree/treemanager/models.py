import datetime

from django.db import models

# Create your models here.
class TreeNode(models.Model):
    name = models.CharField(max_length=100)
    data = models.CharField(max_length=500)
    created = models.DateTimeField(default=datetime.datetime.now())
    updated = models.DateTimeField(default=datetime.datetime.now())
    active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class NodeMapping(models.Model):
    childId = models.IntegerField()
    parentId = models.IntegerField()
    created = models.DateTimeField(default=datetime.datetime.now())
    updated = models.DateTimeField(default=datetime.datetime.now())
    active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)