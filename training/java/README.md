# Java 25 / Apache NetBeans learning sample

This optional, isolated **synthetic-data** exercise is for KC Veteran Tech Builders onboarding and NGT/IAU Java fundamentals. It does **not** change the Cloudflare Worker, backend database, production build or user data.

## Tools

- Eclipse Temurin JDK 25 (LTS), Maven 3.9+ and Apache NetBeans 31
- Open `training/java/pom.xml` as a Maven project in NetBeans
- `mvn -f training/java/pom.xml package` builds a small test project
- `java -cp training/java/target/test-classes:training/java/target/classes org.kcveterantechbuilders.SyntheticEventCounterTest` runs synthetic tests on Unix (use semicolon separator on Windows)
- `jdeps --jdk-internals training/java/target/classes` checks for internal JDK APIs
- `jdeprscan --release 25 training/java/target/classes` scans deprecated API usage
- Javadoc is built in CI and can be regenerated locally

Prefer an open-source Temurin JDK to avoid adding an Oracle commercial license dependency. Oracle JDK compatibility is only a separate optional test. Do not upload service records, benefits information, application forms, or actual users' data into a training workspace.

Eclipse Che workspace support is provided by the repository's optional `devfile.yaml`. Che itself requires an authorized Kubernetes/OpenShift cluster; no cluster is deployed by this project.
