# Java / Eclipse Development Toolchain Integration Decision (2026-10)

This is a nonproduction training and development enhancement for KC Veteran Tech Builders. Do not install a Kubernetes cluster, migrate Cloudflare Workers, or upload applicant information to a hosted IDE.

## Adopt now

- **Eclipse Che Devfiles:** `devfile.yaml` specifies repeatable containers for Node-oriented Worker maintenance and separate Java 25/Maven training. Che runtime deployment requires an existing authorized Kubernetes/OpenShift environment, OIDC/RBAC, credentials for the private repositories, and resource limits. A parsed devfile does not establish that Che successfully started.
- **Apache NetBeans 31:** Open `training/java/pom.xml` as a Maven project; use breakpoints and debugger for the synthetic exercise. NetBeans is an IDE, not a runtime dependency. No server-side NetBeans installation is required.
- **Eclipse Temurin OpenJDK 25 LTS:** GitHub Actions selects `actions/setup-java` with `distribution: temurin` and JDK 25; this prevents the workstation's Java version from silently determining CI results.
- **Built-in JDK quality tools:** `jdeps --jdk-internals`, `jdeprscan`, and `javadoc` run on the Java training module. No sun.* private APIs or unverifiable compatibility claims.

## Evaluate only when justified

- **Oracle JDK 27:** The newest feature release is not the long-term support baseline chosen for this training module. Consider it solely as a separate compatibility matrix on Java-specific projects, after license/support review.
- **GraalVM Native Image:** Benchmark startup time, peak memory, binary size, and build complexity for an actual Java CLI before adopting. These gains would not speed up a JavaScript Cloudflare Worker. Do not deploy native images solely on vendor benchmarks.
- **Java Flight Recorder / JDK Mission Control:** Valuable when diagnosing an actual JVM performance problem. Profiling commands should be run only on synthetic workloads or authorized environments; diagnostic captures can reveal application and environment details.
- **Eclipse Che Image Puller/autoscaling:** Only after measuring cold workspace launches and capacity. An entire Kubernetes control plane is not cost-effective for one developer already using GitHub/Cloudflare.

## Optional JVM profiling exercise

After building the Java sample locally or in a secured developer workspace:

```bash
java -XX:StartFlightRecording=filename=training/java/target/synthetic.jfr,dumponexit=true,settings=default -cp training/java/target/test-classes:training/java/target/classes org.kcveterantechbuilders.SyntheticEventCounterTest
jfr summary training/java/target/synthetic.jfr
```

This is a diagnostic exercise, not automatically enabled monitoring. Retain or share only synthetic recordings.

## Verification and release boundaries

The pilot requires Java CI completion, GitHub DCO, a developer-opening test in NetBeans, and an optional Che workspace startup test *if* a supported secured Kubernetes cluster exists. No live service configuration or production data flow changes accompany this pilot.

Sources:
- https://eclipse.dev/che/docs/stable/overview/introduction-to-eclipse-che/
- https://devfile.io/docs/2.3.0/create-devfiles
- https://netbeans.apache.org/front/main/download/
- https://www.oracle.com/java/technologies/downloads/
- https://adoptium.net/installation
- https://dev.java/learn/jvm/core-tools/
- https://docs.oracle.com/en/java/javase/25/troubleshoot/diagnostic-tools.html
- https://www.graalvm.org/release-notes/25.1/
