from rest_framework import serializers
from django.contrib.auth import get_user_model
import re
User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
   

    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password( validated_data['password'])
        user.save()
        return user

    class Meta:
        model=User
        fields =["pk" , 'username','password']


class SuggestionUserSerializer(serializers.ModelSerializer):
        avatar_url = serializers.SerializerMethodField("avatar_url_field")

        def avatar_url_field(self, author):
            if re.match(r"^https?://", author.avatar_url):
                return author.avatar_url

            if "request" in self.context:
                scheme = self.context["request"].scheme
                host = self.context["request"].get_host()
                return scheme + "://" + host + author.avatar_url
        class Meta:
            model =User
            fields =["username" , "name" ,"avatar_url"]
            
            
class ProfileSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField("avatar_url_field")
    def avatar_url_field(self, author):
            if re.match(r"^https?://", author.avatar_url):
                return author.avatar_url

            if "request" in self.context:
                scheme = self.context["request"].scheme
                host = self.context["request"].get_host()
                return scheme + "://" + host + author.avatar_url
    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'avatar_url',
            'post_count',
            'follower_count',
            'following_count'
        ]

    def get_post_count(self, obj):
        return obj.my_post_set.count()

    def get_follower_count(self, obj):
        return obj.follower_set.count()

    def get_following_count(self, obj):
        return obj.following_set.count()            