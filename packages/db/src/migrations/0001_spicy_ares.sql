CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(7) DEFAULT '#6366f1' NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" text,
	"status" varchar(50) DEFAULT 'todo' NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"due_date" timestamp,
	"completed_at" timestamp,
	"project_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "project_archived_idx" ON "project" USING btree ("is_archived");--> statement-breakpoint
CREATE INDEX "task_projectId_idx" ON "task" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "task_status_idx" ON "task" USING btree ("status");--> statement-breakpoint
CREATE INDEX "task_priority_idx" ON "task" USING btree ("priority");