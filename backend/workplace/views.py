from django.shortcuts import render, redirect

from .models import Workspace
from .forms import WorkplaceForm

def workplace_list(request):
    context = {'workplace_list':Workspace.objects.all()}
    return render(request, "workplace_list.html", context)

def workplace_delete(request, id):
    Workspace.objects.filter(pk=id).delete()
    context = {'workplace_list': Workspace.objects.all()}
    return render(request, "workplace_list.html", context)

def workplace_edit(request, id=0):
    if request.method == "GET":
        workplace = Workspace.objects.get(pk=id)
        form = WorkplaceForm(instance=workplace)
        print(workplace)
        print(form)
        return render(request, "workplace_edit.html",{'form': form})
    else:
        workplace = Workspace.objects.get(pk=id)
        form = WorkplaceForm(request.POST,instance=workplace)
        if form.is_valid():
            form.save()
        return redirect('/workplace/')

def workplace_add(request):
    if request.method == "GET":
        form = WorkplaceForm()
        return render(request, "workplace_add.html",{'form': form})
    else: 
        form = WorkplaceForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('/workplace/')

