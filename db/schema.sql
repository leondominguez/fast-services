-- public.jobs definition

-- Drop table

-- DROP TABLE public.jobs;

CREATE TABLE public.jobs (
	id serial4 NOT NULL,
	title varchar(30) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT jobs_pkey PRIMARY KEY (id)
);



-- public.requests definition

-- Drop table

-- DROP TABLE public.requests;

CREATE TABLE public.requests (
	id serial4 NOT NULL,
	"date" timestamptz NULL,
	payment float8 NULL,
	state int2 NULL DEFAULT 1,
	rating int2 NULL DEFAULT 1,
	hours int2 NULL,
	description text NULL,
	"jobId" int4 NULL,
	"userPhone" varchar(255) NULL,
	"workerId" int4 NULL,
	CONSTRAINT requests_pkey PRIMARY KEY (id)
);


-- public.requests foreign keys

ALTER TABLE public.requests ADD CONSTRAINT "requests_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.jobs(id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE public.requests ADD CONSTRAINT "requests_userPhone_fkey" FOREIGN KEY ("userPhone") REFERENCES public.users(phone) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE public.requests ADD CONSTRAINT "requests_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES public.workers(id) ON DELETE SET NULL ON UPDATE CASCADE;





-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	phone varchar(255) NOT NULL,
	"name" varchar(70) NULL,
	address varchar(90) NULL,
	"addressGps" public.geometry(point, 4326) NULL,
	email varchar(80) NULL,
	"password" text NULL,
	"paymentMethod" int2 NULL,
	"photoPublicService" varchar(200) NULL,
	"cardNumber" varchar(20) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (phone)
);




-- public.worker_jobs definition

-- Drop table

-- DROP TABLE public.worker_jobs;

CREATE TABLE public.worker_jobs (
	price float8 NULL DEFAULT '5000'::double precision,
	"workerId" int4 NOT NULL,
	"jobId" int4 NOT NULL,
	CONSTRAINT worker_jobs_pkey PRIMARY KEY ("workerId", "jobId")
);


-- public.worker_jobs foreign keys

ALTER TABLE public.worker_jobs ADD CONSTRAINT "worker_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.jobs(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.worker_jobs ADD CONSTRAINT "worker_jobs_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES public.workers(id) ON DELETE CASCADE ON UPDATE CASCADE;





-- public.workers definition

-- Drop table

-- DROP TABLE public.workers;

CREATE TABLE public.workers (
	id serial4 NOT NULL,
	phone varchar(255) NULL,
	"name" varchar(70) NULL,
	address varchar(90) NULL,
	"addressGps" public.geometry(point, 4326) NULL,
	email varchar(80) NULL,
	"password" text NULL,
	"identificationPhoto" varchar(200) NULL,
	"profilePhoto" varchar(200) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT workers_email_key UNIQUE (email),
	CONSTRAINT workers_pkey PRIMARY KEY (id)
);



