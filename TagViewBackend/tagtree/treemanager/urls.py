from django.urls import path
from . import views

urlpatterns = [
    path('tree/', views.get_tree_structure, name="get_tree_structure"),
    path('update-tree/', views.updateTree, name="update_tree"),
    path('add-new-tree/', views.addNewTree, name="add_new_tree")
]