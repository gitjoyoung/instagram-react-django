from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment , Tag



@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["photo_tag", "caption", "username", "created_at", "updated_at"]

    list_display_links = ["caption"]

    def photo_tag(self, post):
        return mark_safe(f"<img src={post.photo.url} style='width : 100px';/>")
       
    def username(self, post):
        return post.author.username

    def created_at(self, post):
        return post.created_at

    def updated_at(self, post):
        return post.updated_at

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass