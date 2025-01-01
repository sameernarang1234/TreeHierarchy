from rest_framework import serializers
from .models import TreeNode, NodeMapping

class TreeNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreeNode
        fields = ['id', 'name', 'data', 'created', 'updated', 'active', 'deleted']

class FilteredTreeNodeSerializer(serializers.ModelSerializer):
    componentId = serializers.SerializerMethodField()

    class Meta:
        model = TreeNode
        fields = ['componentId', 'name', 'data']

    def get_componentId(self, obj):
        return obj.id

class NodeMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeMapping
        fields = ['id', 'childId', 'parentId', 'created', 'updated', 'active', 'deleted']