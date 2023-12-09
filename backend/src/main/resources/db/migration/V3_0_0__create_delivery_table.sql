CREATE TYPE delivery_status_type AS ENUM ('PICKED_UP', 'DELIVERING', 'DELIVERED');
CREATE TYPE product_type AS ENUM ('DOCUMENT', 'PRODUCT');


CREATE TABLE delivery (
    delivery_id UUID NOT NULL DEFAULT uuid_generate_v1(),

    from_commune_id INT NOT NULL,
    to_commune_id INT NOT NULL,

    from_address VARCHAR(255) NOT NULL,
    to_address VARCHAR(255) NOT NULL,

    from_phone VARCHAR(255) NOT NULL,
    to_phone VARCHAR(255) NOT NULL,

    from_name VARCHAR(255) NOT NULL,
    to_name VARCHAR(255) NOT NULL,

    from_shop_id INT NOT NULL,
    to_shop_id INT NOT NULL,

    product product_type NOT NULL,


    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT delivery_pk PRIMARY KEY (delivery_id),
    CONSTRAINT delivery_from_commune_fk FOREIGN KEY (from_commune_id) REFERENCES commune (commune_id),
    CONSTRAINT delivery_to_commune_fk FOREIGN KEY (to_commune_id) REFERENCES commune (commune_id),
    CONSTRAINT delivery_from_shop_fk FOREIGN KEY (from_shop_id) REFERENCES shop (shop_id),
    CONSTRAINT delivery_to_shop_fk FOREIGN KEY (to_shop_id) REFERENCES shop (shop_id)
);

CREATE TABLE delivery_status (
    delivery_status_id SERIAL NOT NULL,
    delivery_id UUID NOT NULL,
    status delivery_status_type NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT delivery_statuses_pk PRIMARY KEY (delivery_status_id),
    CONSTRAINT delivery_statuses_delivery_fk FOREIGN KEY (delivery_id) REFERENCES delivery (delivery_id)
);