---
draft: true
title: Go, Cloud Run, and Cloud SQL Postgres
date: 2020-01-17
---

Go + Cloud Run + Cloud SQL Postgres is a simple, powerful stack for running services in the cloud--I use it for nearly all my projects--but getting everything set up correctly can be frustrating since the [documentation](https://cloud.google.com/sql/docs/postgres/connect-run) doesn't include a go example or a canonical PostgreSQL connection URI. Here's a quick tutorial to get you up and running.

## TL;DR

If you're already set up and you're getting an error like `dial tcp 127.0.0.1:5432: connect: connection refused` when your connect to your Cloud SQL Postgres instance from your Cloud Run container, try using the following connection string format to connect to the Cloud SQL proxy's unix socket:

```
postgres://dbusername:dbpassword@/dbname?host=/cloudsql/my-project:us-central1:my-db
```

## Set up your Cloud SQL Postgres instance

First, you need to set up a PostgreSQL cluster. Here we'll spin up a shared resource `db-f1-micro` instance. Be aware that this instance will run you about $8.00 a month if you leave it running.

```shell
$ gcloud sql instances create --database-version=POSTGRES_11 --root-password=xxx --tier db-f1-micro --region=us-central my-db
```

While you wait for your PostgreSQL cluster to be provisioned, set up the go service we'll be running with Cloud Run:

```shell
$ mkdir test-cloud-sql
$ cd test-cloud-sql
$ go mod init github.com/myaccount/test-cloud-sql
```

In the same directory, write the following to `main.go`

{{< gist artgillespie a5d8d14d6a89dcdfe532189f60a22eb8 >}}

```go
package main

import (
    "database/sql"
    "fmt"
    "http"

    _ "github.com/lib/pq"
)

func myHandler(w http.ResponseWriter, r *http.Request) {
}

```
