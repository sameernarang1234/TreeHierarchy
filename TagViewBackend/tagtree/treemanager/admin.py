from django.contrib import admin

from .models import TreeNode, NodeMapping

# Register your models here.
admin.site.register(TreeNode)
admin.site.register(NodeMapping)