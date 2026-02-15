CREATE TABLE `job_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_id` int NOT NULL,
	`applicant_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone_number` varchar(50),
	`resume_url` text NOT NULL,
	`cover_letter` text,
	`status` enum('applied','reviewing','shortlisted','rejected','selected') NOT NULL DEFAULT 'applied',
	`employer_notes` text,
	`applied_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_apply` UNIQUE(`job_id`,`applicant_id`)
);
--> statement-breakpoint
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_job_id_jobs_id_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_applicant_id_applicants_id_fk` FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`) ON DELETE cascade ON UPDATE no action;