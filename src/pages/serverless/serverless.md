---
title: "Serverless in the Cloud"
date: "2017-12-20"
author: Jai
---

![Serverless Tech](serverless.jpg)


Serverless is about running your backend without managing your own servers or server applications.
In AWS Lambda, the functions can be written in any of Javascript, Python or any JVM language like Java, Clojure, Scala. These functions are triggered on events, which could be triggered from s3, kinesis, http client etc.

**Scaling in such a setup is completely automatic and managed by AWS.**

This is what Martin Fowler has to say about serverless technologies.

_"Serverless architectures refer to applications that significantly depend on third-party services (knows as Backend as a Service or "BaaS") or on custom code that's run in ephemeral containers (Function as a Service or "FaaS"), the best known vendor host of which currently is AWS Lambda. By using these ideas, and by moving much behavior to the front end, such architectures remove the need for the traditional 'always on' server system sitting behind an application. Depending on the circumstances, such systems can significantly reduce operational cost and complexity at a cost of vendor dependencies and (at the moment) immaturity of supporting services."_
