import { QuickPickItem } from "vscode";

export function getQuarkusExtensionsInfo(): QuickPickItem[] {
	var items: QuickPickItem[] = [
		{
			description: "Reactive Postgres Client",
			label: "quarkus-reactive-pg-client"
		},
		{
			description: "Mailer",
			label: "quarkus-mailer"
		},
		{
			description: "Eclipse Vert.x",
			label: "quarkus-vertx"
		},
		{
			description: "Undertow WebSockets",
			label: "quarkus-undertow-websockets"
		},
		{
			description: "Undertow",
			label: "quarkus-undertow"
		},
		{
			description: "Swagger UI",
			label: "quarkus-swagger-ui"
		},
		{
			description: "Spring DI compatibility layer",
			label: "quarkus-spring-di"
		},
		{
			description: "SmallRye REST Client",
			label: "quarkus-smallrye-rest-client"
		},
		{
			description: "SmallRye Reactive Messaging - Kafka Connector",
			label: "quarkus-smallrye-reactive-messaging-kafka"
		},
		{
			description: "SmallRye Reactive Messaging",
			label: "quarkus-smallrye-reactive-messaging"
		},
		{
			description: "SmallRye Reactive Type Converters",
			label: "quarkus-smallrye-reactive-type-converters"
		},
		{
			description: "SmallRye Reactive Streams Operators",
			label: "quarkus-smallrye-reactive-streams-operators"
		},
		{
			description: "SmallRye OpenTracing",
			label: "quarkus-smallrye-opentracing"
		},
		{
			description: "SmallRye OpenAPI",
			label: "quarkus-smallrye-openapi"
		},
		{
			description: "SmallRye Metrics",
			label: "quarkus-smallrye-metrics"
		},
		{
			description: "SmallRye JWT",
			label: "quarkus-smallrye-jwt"
		},
		{
			description: "SmallRye Health",
			label: "quarkus-smallrye-health"
		},
		{
			description: "SmallRye Fault Tolerance",
			label: "quarkus-smallrye-fault-tolerance"
		},
		{
			description: "SmallRye Context Propagation",
			label: "quarkus-smallrye-context-propagation"
		},
		{
			description: "Security",
			label: "quarkus-elytron-security"
		},
		{
			description: "Scheduler",
			label: "quarkus-scheduler"
		},
		{
			description: "RESTEasy - JSON-B",
			label: "quarkus-resteasy-jsonb"
		},
		{
			description: "RESTEasy",
			label: "quarkus-resteasy"
		},
		{
			description: "Narayana JTA - Transaction manager",
			label: "quarkus-narayana-jta"
		},
		{
			description: "AWS Lambda",
			label: "quarkus-amazon-lambda"
		},
		{
			description: "Kubernetes ",
			label: "quarkus-kubernetes"
		},
		{
			description: "Kotlin",
			label: "quarkus-kotlin"
		},
		{
			description: "Keycloak",
			label: "quarkus-keycloak"
		},
		{
			description: "JSON-P",
			label: "quarkus-jsonp"
		},
		{
			description: "JSON-B",
			label: "quarkus-jsonb"
		},
		{
			description: "DBC Driver - PostgreSQL",
			label: "quarkus-jdbc-postgresql"
		},
		{
			description: "JDBC Driver - MariaDB",
			label: "quarkus-jdbc-mariadb"
		},
		{
			description: "JDBC Driver - H2",
			label: "quarkus-jdbc-h2"
		},
		{
			description: "Infinispan Client",
			label: "quarkus-infinispan-client"
		},
		{
			description: "Hibernate Validator",
			label: "quarkus-hibernate-validator"
		},
		{
			description: "Hibernate Search + Elasticsearch",
			label: "quarkus-hibernate-search-elasticsearch"
		},
		{
			description: "Hibernate ORM with Panache",
			label: "quarkus-hibernate-orm-panache"
		},
		{
			description: "Hibernate ORM",
			label: "quarkus-hibernate-orm"
		},
		{
			description: "Flyway",
			label: "quarkus-flyway"
		},
		{
			description: "Camel Salesforce",
			label: "quarkus-camel-salesforce"
		},
		{
			description: "Camel Netty4 HTTP",
			label: "quarkus-camel-netty4-http"
		},
		{
			description: "Camel Infinispan",
			label: "quarkus-camel-infinispan"
		},
		{
			description: "Camel Core",
			label: "quarkus-camel-core"
		},
		{
			description: "Arc",
			label: "quarkus-arc"
		},
		{
			description: "Agroal - Database connection pool",
			label: "quarkus-agroal"
		}
	];
	return items;
}
