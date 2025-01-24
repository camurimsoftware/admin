CREATE TABLE "camurim_user" (
	"id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "camurim_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" varchar(256),
	"guest" varchar(256),
	"document" varchar(256),
	"reference_number" bigint,
	"room_number" bigint,
	"start_date" timestamp,
	"end_date" timestamp,
	"signature_url" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp,
	CONSTRAINT "camurim_user_document_unique" UNIQUE("document")
);
--> statement-breakpoint
CREATE INDEX "document_idx" ON "camurim_user" USING btree ("document");