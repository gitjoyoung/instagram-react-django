from rest_framework import serializers
from django.contrib.auth import get_user_model
import re
from aka.serializers import PostSerializer
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
    username = serializers.CharField(read_only=True)
    following_set = serializers.StringRelatedField(many=True)
    follower_set = serializers.StringRelatedField(many=True)
    avatar_url = serializers.SerializerMethodField("avatar_url_field")
    post_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    followings_count = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()
    
    def get_posts(self, obj):
        queryset = obj.my_post_set.all()
        serializer = PostSerializer(queryset, many=True, context=self.context)
        return serializer.data

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    def get_followers_count(self, obj):
        return obj.follower_set.count()

    def get_followings_count(self, obj):
        return obj.following_set.count()

    def get_post_count(self, obj):
        return obj.my_post_set.count()

    class Meta:
        model = User
        fields = (
            "username",
            "post_count",
            "avatar_url",
            "followers_count",
            "followings_count",
            "following_set",
            "follower_set",
            "posts",
        )