import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1629943040124 implements MigrationInterface {
    name = 'Initial1629943040124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "timeslot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "availabilityId" uuid NOT NULL, "meetId" uuid NOT NULL, "slot" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cd8bca557ee1eb5b090b9e63009" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "ownerId" uuid, "dates" TIMESTAMP WITH TIME ZONE array NOT NULL, "isDateAgnostic" boolean NOT NULL DEFAULT false, "hours" integer array NOT NULL, "scheduledTime" TIMESTAMP WITH TIME ZONE array, CONSTRAINT "PK_9bd21c06b21abbe6c6306349d35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "meetId" uuid NOT NULL, "userId" uuid, "password" character varying, "name" character varying NOT NULL, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_029a132bfcc7bab4fcbbe197fdd" FOREIGN KEY ("availabilityId") REFERENCES "availability"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_100797bb67e4ad8c3bed74edbae" FOREIGN KEY ("meetId") REFERENCES "meet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meet" ADD CONSTRAINT "FK_8c79a307656e571d3737cb7dc9e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_4d58dcd6e49a3c7a62d03a5429c" FOREIGN KEY ("meetId") REFERENCES "meet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_42a42b693f05f17e56d1d9ba93f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_42a42b693f05f17e56d1d9ba93f"`);
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_4d58dcd6e49a3c7a62d03a5429c"`);
        await queryRunner.query(`ALTER TABLE "meet" DROP CONSTRAINT "FK_8c79a307656e571d3737cb7dc9e"`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_100797bb67e4ad8c3bed74edbae"`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_029a132bfcc7bab4fcbbe197fdd"`);
        await queryRunner.query(`DROP TABLE "availability"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "meet"`);
        await queryRunner.query(`DROP TABLE "timeslot"`);
    }

}
