package com.coffeshop.app.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A OrderedCoffe.
 */
@Entity
@Table(name = "ordered_coffe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderedCoffe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "coffe")
    private String coffe;

    @Column(name = "client")
    private String client;

    @Column(name = "order_id")
    private String orderId;

    @Column(name = "amount")
    private String amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoffe() {
        return coffe;
    }

    public OrderedCoffe coffe(String coffe) {
        this.coffe = coffe;
        return this;
    }

    public void setCoffe(String coffe) {
        this.coffe = coffe;
    }

    public String getClient() {
        return client;
    }

    public OrderedCoffe client(String client) {
        this.client = client;
        return this;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getOrderId() {
        return orderId;
    }

    public OrderedCoffe orderId(String orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getAmount() {
        return amount;
    }

    public OrderedCoffe amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderedCoffe)) {
            return false;
        }
        return id != null && id.equals(((OrderedCoffe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderedCoffe{" +
            "id=" + getId() +
            ", coffe='" + getCoffe() + "'" +
            ", client='" + getClient() + "'" +
            ", orderId='" + getOrderId() + "'" +
            ", amount='" + getAmount() + "'" +
            "}";
    }
}
