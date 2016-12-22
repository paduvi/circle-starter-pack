/**
 * Created by chotoxautinh on 12/20/16.
 */
var escape = require('../utilities/helpers/escape');

module.exports = {
    /**
     *
     * @param schema_name
     */
    createSchema: function (schema_name) {
        return `create schema if not exists "${schema_name}"`;
    },
    /**
     * $1: schema_name
     * $2: schema_id
     */
    createFlakeIdGenerator: function (schema_name, schema_id) {
        return `create schema if not exists "${schema_name}";
            DO
            $do$
            DECLARE
               _kind "char";
            BEGIN
               SELECT INTO _kind  c.relkind
               FROM   pg_class     c
               JOIN   pg_namespace n ON n.oid = c.relnamespace
               WHERE  c.relname = 'global_id_sequence'      -- sequence name here
               AND    n.nspname = '${schema_name}';  -- schema name here
            
               IF NOT FOUND THEN       -- name is free
                  CREATE SEQUENCE "${schema_name}".global_id_sequence;
               ELSIF _kind = 'S' THEN  -- sequence exists
                  -- do nothing?
               ELSE                    -- conflicting object of different type exists
                  -- do somethng!
               END IF;
            END
            $do$;
            
            CREATE OR REPLACE FUNCTION "${schema_name}".id_generator(OUT result bigint) AS $$
            DECLARE
                our_epoch bigint := 1314220021721;
                seq_id bigint;
                now_millis bigint;
                -- the id of this DB shard, must be set for each
                -- schema shard you have - you could pass this as a parameter too
                shard_id int := ${schema_id};
            BEGIN
                SELECT nextval('"${schema_name}".global_id_sequence') % 1024 INTO seq_id;
            
                SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
                result := (now_millis - our_epoch) << 23;
                result := result | (shard_id << 10);
                result := result | (seq_id);
            END;
            $$ LANGUAGE PLPGSQL;`
    },

    /**
     *
     * @param table_name
     * @param from
     * @returns {string}
     */
    inherit: function (table_name, from) {
        table_name = escape.name(table_name);
        from = escape.name(from);
        return `
            DO
                $do$
                DECLARE v_exists BOOLEAN;
                
                BEGIN
                    select INTO v_exists exists (SELECT * 
                        FROM    pg_inherits AS i
                        JOIN    pg_class AS c ON (i.inhrelid=c.oid)
                        JOIN    pg_catalog.pg_namespace AS cnsp ON cnsp.oid = c.relnamespace
                        JOIN    pg_class AS p ON (i.inhparent=p.oid)
                        JOIN    pg_catalog.pg_namespace AS pnsp ON pnsp.oid = p.relnamespace
                        WHERE   '"' || cnsp.nspname || '"."' || c.relname || '"' = '${table_name}' 
                            AND '"' || pnsp.nspname || '"."' || p.relname || '"' = '${from}');
                    IF v_exists = false THEN
                        ALTER TABLE ${table_name} INHERIT ${from};
                    END IF;
                END
                $do$;`;
    }
}