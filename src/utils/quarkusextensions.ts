import { QuickPickItem } from "vscode";

export function getQuarkusExtensionsInfo(): QuickPickItem[] {
	var rawData = getRawExtensionData();
	var items: QuickPickItem[] = [];
	rawData.forEach(function(item) {
		var newQuickPickItem: QuickPickItem = {
			description: item.name,
			label: item.groupId + ":" + item.artifactId
		};
		items.push(newQuickPickItem);
	});

	return items;
}

// needs to be updated for each quarkus release
export function getRawExtensionData() {
	return [
		{
			name: "Agroal - Database connection pool",
			labels: ["agroal", "database-connection-pool"],
			groupId: "io.quarkus",
			artifactId: "quarkus-agroal"
		},
		{
			name: "Arc",
			labels: ["arc", "cdi", "dependency-injection", "di"],
			groupId: "io.quarkus",
			artifactId: "quarkus-arc",
			guide: "https://quarkus.io/guides/cdi-reference"
		},
		{
			name: "Camel Core",
			labels: ["camel-core", "camel"],
			groupId: "io.quarkus",
			artifactId: "quarkus-camel-core"
		},
		{
			name: "Camel Infinispan",
			labels: ["camel-infinispan", "camel"],
			groupId: "io.quarkus",
			artifactId: "quarkus-camel-infinispan"
		},
		{
			name: "Camel Netty4 HTTP",
			labels: ["camel-netty4-http", "camel"],
			groupId: "io.quarkus",
			artifactId: "quarkus-camel-netty4-http"
		},
		{
			name: "Camel Salesforce",
			labels: ["camel-salesforce", "camel"],
			groupId: "io.quarkus",
			artifactId: "quarkus-camel-salesforce"
		},
		{
			name: "Flyway",
			labels: ["flyway", "database", "data"],
			groupId: "io.quarkus",
			artifactId: "quarkus-flyway",
			guide: "https://quarkus.io/guides/flyway-guide"
		},
		{
			name: "Hibernate ORM",
			labels: ["hibernate-orm", "jpa", "hibernate"],
			groupId: "io.quarkus",
			artifactId: "quarkus-hibernate-orm",
			guide: "https://quarkus.io/guides/hibernate-orm-guide"
		},
		{
			name: "Hibernate ORM with Panache",
			labels: ["hibernate-orm-panache", "panache", "hibernate", "jpa"],
			groupId: "io.quarkus",
			artifactId: "quarkus-hibernate-orm-panache",
			guide: "https://quarkus.io/guides/hibernate-orm-panache-guide"
		},
		{
			name: "Hibernate Search + Elasticsearch",
			labels: [
				"hibernate-search-elasticsearch",
				"search",
				"full-text",
				"hibernate",
				"elasticsearch"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-hibernate-search-elasticsearch",
			guide: "https://quarkus.io/guides/hibernate-search-guide"
		},
		{
			name: "Hibernate Validator",
			labels: ["hibernate-validator", "bean-validation", "validation"],
			groupId: "io.quarkus",
			artifactId: "quarkus-hibernate-validator",
			guide: "https://quarkus.io/guides/validation-guide"
		},
		{
			name: "Infinispan Client",
			labels: ["infinispan-client", "data-grid-client", "infinispan"],
			groupId: "io.quarkus",
			artifactId: "quarkus-infinispan-client",
			guide: "https://quarkus.io/guides/infinispan-client-guide"
		},
		{
			name: "JDBC Driver - H2",
			labels: ["jdbc-h2", "jdbc", "h2"],
			groupId: "io.quarkus",
			artifactId: "quarkus-jdbc-h2"
		},
		{
			name: "JDBC Driver - MariaDB",
			labels: ["jdbc-mariadb", "jdbc", "mariadb"],
			groupId: "io.quarkus",
			artifactId: "quarkus-jdbc-mariadb"
		},
		{
			name: "JDBC Driver - PostgreSQL",
			labels: ["jdbc-postgresql", "jdbc", "postgresql"],
			groupId: "io.quarkus",
			artifactId: "quarkus-jdbc-postgresql"
		},
		{
			name: "JSON-B",
			labels: ["jsonb", "json-b", "json"],
			groupId: "io.quarkus",
			artifactId: "quarkus-jsonb",
			guide: "https://quarkus.io/guides/rest-json-guide"
		},
		{
			name: "JSON-P",
			labels: ["jsonp", "json-p", "json"],
			groupId: "io.quarkus",
			artifactId: "quarkus-jsonp"
		},
		{
			name: "Keycloak",
			labels: ["keycloak", "oauth2", "openid-connect"],
			groupId: "io.quarkus",
			artifactId: "quarkus-keycloak",
			guide: "https://quarkus.io/guides/keycloak-guide"
		},
		{
			name: "Kotlin",
			labels: ["kotlin"],
			groupId: "io.quarkus",
			artifactId: "quarkus-kotlin",
			guide: "https://quarkus.io/guides/kotlin"
		},
		{
			name: "Kubernetes",
			labels: ["kubernetes"],
			groupId: "io.quarkus",
			artifactId: "quarkus-kubernetes",
			guide: "https://quarkus.io/guides/kubernetes-guide"
		},
		{
			name: "AWS Lambda",
			labels: ["lambda", "aws"],
			groupId: "io.quarkus",
			artifactId: "quarkus-amazon-lambda"
		},
		{
			name: "Narayana JTA - Transaction manager",
			labels: [
				"narayana-jta",
				"narayana",
				"jta",
				"transactions",
				"transaction",
				"tx",
				"txs"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-narayana-jta",
			guide: "https://quarkus.io/guides/transaction-guide"
		},
		{
			name: "RESTEasy",
			labels: ["resteasy", "jaxrs", "web", "rest"],
			groupId: "io.quarkus",
			artifactId: "quarkus-resteasy",
			guide: "https://quarkus.io/guides/rest-json-guide"
		},
		{
			name: "RESTEasy - JSON-B",
			labels: [
				"resteasy-jsonb",
				"jaxrs-json",
				"resteasy-json",
				"resteasy",
				"jaxrs",
				"json",
				"jsonb"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-resteasy-jsonb",
			guide: "https://quarkus.io/guides/rest-json-guide"
		},
		{
			name: "Scheduler",
			labels: ["scheduler", "tasks", "periodic-tasks"],
			groupId: "io.quarkus",
			artifactId: "quarkus-scheduler",
			guide: "https://quarkus.io/guides/scheduled-guide"
		},
		{
			name: "Security",
			labels: ["security"],
			groupId: "io.quarkus",
			artifactId: "quarkus-elytron-security",
			guide: "https://quarkus.io/guides/security-guide"
		},
		{
			name: "SmallRye Context Propagation",
			labels: [
				"smallrye-context-propagation",
				"microprofile-context-propagation",
				"context-propagation",
				"context",
				"reactive"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-context-propagation"
		},
		{
			name: "SmallRye Fault Tolerance",
			labels: [
				"smallrye-fault-tolerance",
				"fault-tolerance",
				"microprofile-fault-tolerance",
				"circuit-breaker",
				"bulkhead"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-fault-tolerance"
		},
		{
			name: "SmallRye Health",
			labels: [
				"smallrye-health",
				"health-check",
				"health",
				"microprofile-health",
				"microprofile-health-check"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-health",
			guide: "https://quarkus.io/guides/health-guide"
		},
		{
			name: "SmallRye JWT",
			labels: ["smallrye-jwt", "jwt", "json-web-token", "rbac"],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-jwt",
			guide: "https://quarkus.io/guides/jwt-guide"
		},
		{
			name: "SmallRye Metrics",
			labels: [
				"smallrye-metrics",
				"metrics",
				"metric",
				"prometheus",
				"monitoring"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-metrics",
			guide: "https://quarkus.io/guides/metrics-guide"
		},
		{
			name: "SmallRye OpenAPI",
			labels: ["smallrye-openapi", "openapi", "open-api"],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-openapi",
			guide: "https://quarkus.io/guides/openapi-swaggerui-guide"
		},
		{
			name: "SmallRye OpenTracing",
			labels: [
				"smallrye-opentracing",
				"opentracing",
				"tracing",
				"distributed-tracing",
				"jaeger"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-opentracing",
			guide: "https://quarkus.io/guides/opentracing-guide"
		},
		{
			name: "SmallRye Reactive Streams Operators",
			labels: [
				"smallrye-reactive-streams-operators",
				"smallrye-reactive-streams",
				"reactive-streams-operators",
				"reactive-streams",
				"microprofile-reactive-streams",
				"reactive"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-reactive-streams-operators"
		},
		{
			name: "SmallRye Reactive Type Converters",
			labels: [
				"smallrye-reactive-type-converters",
				"reactive-type-converters",
				"reactive-streams-operators",
				"reactive-streams",
				"microprofile-reactive-streams",
				"reactive"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-reactive-type-converters"
		},
		{
			name: "SmallRye Reactive Messaging",
			labels: [
				"smallrye-reactive-messaging",
				"reactive-messaging",
				"reactive"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-reactive-messaging",
			guide: "https://quarkus.io/guides/async-message-passing"
		},
		{
			name: "SmallRye Reactive Messaging - Kafka Connector",
			labels: ["kafka", "reactive-kafka"],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-reactive-messaging-kafka",
			guide: "https://quarkus.io/guides/kafka-guide"
		},
		{
			name: "SmallRye REST Client",
			labels: [
				"smallrye-rest-client",
				"rest-client",
				"web-client",
				"microprofile-rest-client"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-smallrye-rest-client",
			guide: "https://quarkus.io/guides/rest-client-guide"
		},
		{
			name: "Spring DI compatibility layer",
			labels: ["spring-di"],
			groupId: "io.quarkus",
			artifactId: "quarkus-spring-di",
			guide: "https://quarkus.io/guides/spring-di-guide"
		},
		{
			name: "Swagger UI",
			labels: ["swagger-ui"],
			groupId: "io.quarkus",
			artifactId: "quarkus-swagger-ui",
			guide: "https://quarkus.io/guides/openapi-swaggerui-guide"
		},
		{
			name: "Undertow",
			labels: ["undertow", "servlet"],
			groupId: "io.quarkus",
			artifactId: "quarkus-undertow"
		},
		{
			name: "Undertow WebSockets",
			labels: [
				"undertow-websockets",
				"undertow-websocket",
				"websocket",
				"websockets",
				"web-socket",
				"web-sockets"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-undertow-websockets",
			guide: "https://quarkus.io/guides/websocket-guide"
		},
		{
			name: "Eclipse Vert.x",
			labels: ["eclipse-vert.x", "vertx", "vert.x", "reactive"],
			groupId: "io.quarkus",
			artifactId: "quarkus-vertx",
			guide: "https://quarkus.io/guides/using-vertx"
		},
		{
			name: "Mailer",
			labels: ["mail", "mailer"],
			groupId: "io.quarkus",
			artifactId: "quarkus-mailer",
			guide: "https://quarkus.io/guides/sending-emails"
		},
		{
			name: "Reactive Postgres Client",
			labels: [
				"eclipse-vert.x",
				"vertx",
				"vert.x",
				"reactive",
				"database",
				"data",
				"postgresql"
			],
			groupId: "io.quarkus",
			artifactId: "quarkus-reactive-pg-client"
		},
		{
			name: "Apache Kafka Client",
			labels: ["kafka"],
			groupId: "io.quarkus",
			artifactId: "quarkus-kafka-client"
		},
		{
			name: "Apache Kafka Streams",
			labels: ["kafka", "kafka-streams"],
			groupId: "io.quarkus",
			artifactId: "quarkus-kafka-streams"
		}
	];
}
