package com.coffeshop.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "command_id")
    private String commandId;

    @Column(name = "payment_method")
    private Boolean paymentMethod;

    @Column(name = "about_us")
    private String aboutUs;

    @Column(name = "recommandation")
    private String recommandation;

    @Column(name = "social_media")
    private String socialMedia;

    @Column(name = "order_date")
    private Instant orderDate;

    @Column(name = "status")
    private OrderStatus status;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommandId() {
        return commandId;
    }

    public Order commandId(String commandId) {
        this.commandId = commandId;
        return this;
    }

    public void setCommandId(String commandId) {
        this.commandId = commandId;
    }

    public Boolean isPaymentMethod() {
        return paymentMethod;
    }

    public Order paymentMethod(Boolean paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(Boolean paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public Order aboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
        return this;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public String getRecommandation() {
        return recommandation;
    }

    public Order recommandation(String recommandation) {
        this.recommandation = recommandation;
        return this;
    }

    public void setRecommandation(String recommandation) {
        this.recommandation = recommandation;
    }

    public String getSocialMedia() {
        return socialMedia;
    }

    public Order socialMedia(String socialMedia) {
        this.socialMedia = socialMedia;
        return this;
    }

    public void setSocialMedia(String socialMedia) {
        this.socialMedia = socialMedia;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public Order orderDate(Instant orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Order clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public Order status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public Order addClient(Client client) {
        this.clients.add(client);
        client.setOrder(this);
        return this;
    }

    public Order removeClient(Client client) {
        this.clients.remove(client);
        client.setOrder(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public Client getClient() {
        return client;
    }

    public Order client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", commandId='" + getCommandId() + "'" +
            ", paymentMethod='" + isPaymentMethod() + "'" +
            ", aboutUs='" + getAboutUs() + "'" +
            ", recommandation='" + getRecommandation() + "'" +
            ", socialMedia='" + getSocialMedia() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
