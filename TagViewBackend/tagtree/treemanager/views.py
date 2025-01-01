from rest_framework.decorators import api_view
from rest_framework.response import Response
import copy

from .models import TreeNode, NodeMapping
from .serializers import NodeMappingSerializer, FilteredTreeNodeSerializer


def populateChildren(currNode, nodesList, mappings):
    childrenIdList = [m['childId'] for m in mappings if m['parentId'] == currNode['componentId']]

    if (childrenIdList is None or len(childrenIdList) == 0):
        currNode['children'] = []
        return

    childrenList = [n for n in nodesList if n['componentId'] in childrenIdList]

    for child in childrenList:
        populateChildren(child, nodesList, mappings)

    currNode['children'] = childrenList

    return

def populateTree(nodesList, mappings):
    rootMappingList = [m['childId'] for m in mappings if m['parentId'] < 0]

    rootNodeList = [n for n in nodesList if n['componentId'] in rootMappingList]

    for rootNode in rootNodeList:
        populateChildren(rootNode, nodesList, mappings)

    return rootNodeList

def prepareChildParentMap(mappings):
    cpMap = {}

    for m in mappings:
        cpMap[m['childId']] = m['parentId']

    return cpMap

def generateTreeStateResponse():
    nodes = TreeNode.objects.filter(active=True, deleted=False)

    mappings = NodeMapping.objects.all()

    nodeSerializer = FilteredTreeNodeSerializer(nodes, many=True)
    mappingSerializer = NodeMappingSerializer(mappings, many=True)

    nodeData = nodeSerializer.data
    mappingData = mappingSerializer.data

    nodeData2 = copy.deepcopy(nodeData)

    treeList = populateTree(nodeData, mappingData)

    responseObject = {
        'idCount': len(mappingData) + 1,
        'treeList': treeList,
        'childParentMap': prepareChildParentMap(mappingData),
        'treeNodes': nodeData2
    }

    return responseObject

@api_view(['GET'])
def get_tree_structure(request):
    return Response(generateTreeStateResponse())

@api_view(['PUT'])
def updateTree(request):
    data = request.data
    newNodes = data['newNodes']
    editedNodes = data['editedNodes']
    newChildParentMaps = data['newChildParentMaps']

    for node in newNodes:
        treeNode = TreeNode(
            name = node['name'],
            data = node['data'],
            active = True,
            deleted = False
        )
        treeNode.save()

        mapping = NodeMapping(
            childId = treeNode.id,
            parentId = newChildParentMaps[str(node['componentId'])],
            active = True,
            deleted = False
        )
        mapping.save()

    for node in editedNodes:
        dbNode = TreeNode.objects.get(id = node['componentId'])
        dbNode.name = node['name']
        dbNode.data = node['data']
        dbNode.save()

    return Response(generateTreeStateResponse())

@api_view(['POST'])
def addNewTree(request):
    data = request.data
    newNodes = data['newNodes']
    editedNodes = data['editedNodes']
    newChildParentMaps = data['newChildParentMaps']

    for node in newNodes:
        treeNode = TreeNode(
            name = node['name'],
            data = node['data'],
            active = True,
            deleted = False
        )
        treeNode.save()

        mapping = NodeMapping(
            childId = treeNode.id,
            parentId = newChildParentMaps[str(node['componentId'])],
            active = True,
            deleted = False
        )
        mapping.save()

    for node in editedNodes:
        dbNode = TreeNode.objects.get(id = node['componentId'])
        dbNode.name = node['name']
        dbNode.data = node['data']
        dbNode.save()

    return Response(generateTreeStateResponse())