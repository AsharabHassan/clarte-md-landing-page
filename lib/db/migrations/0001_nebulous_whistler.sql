CREATE TABLE "order_lookups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_ip_hash" text NOT NULL,
	"target_order_number" text NOT NULL,
	"found" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "order_lookups_rate_limit_idx" ON "order_lookups" USING btree ("client_ip_hash","created_at");