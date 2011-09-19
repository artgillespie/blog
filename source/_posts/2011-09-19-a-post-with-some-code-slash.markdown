---
layout: post
title: "A Post With Some Code!"
date: 2011-09-19 08:54
comments: true
categories: 
---

What do blockquotes look like? 

{% blockquote Jibber Jabbah http://google.com Google %}
Last night I lay in bed looking up at the stars in the sky and I thought to myself, where the heck is the ceiling.
{% endblockquote %}

Perhaps we'd do better to embed gists rather than directly embed code?

{% gist 1226891 %}

Let's consider some code. Code might look like this. Or This. Or This:

``` 
- (void)someMethod:(NSString *)aParam withParam:(NSUInteger)anotherParam {
    // this is a comment, below we'd probably have some code
}

```

And that's all well and fine and all, but perhaps you want to do this:

```
void MyClass::MyMethod(std::string aStringParam, unsigned long aUnsignedParam) {
    /*
     * Here's another method with a comment in its body, only this time
     * it's C++!
     */
}
```

And that's all I have to say about that.

``` 
class Fixnum
  def prime?
    ('1' * self) !~ /^1?$|^(11+?)\1+$/
  end
end
```

