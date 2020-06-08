package com.coffeshop.app.web.rest;

import com.coffeshop.app.domain.OrderedCoffe;
import com.coffeshop.app.repository.OrderedCoffeRepository;
import com.coffeshop.app.service.MailService;
import com.coffeshop.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.coffeshop.app.domain.OrderedCoffe}.
 */
@RestController
@RequestMapping("/api")
public class OrderedCoffeResource {

    private final Logger log = LoggerFactory.getLogger(OrderedCoffeResource.class);

    private static final String ENTITY_NAME = "orderedCoffe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderedCoffeRepository orderedCoffeRepository;
    private MailService mailService;

    public OrderedCoffeResource(OrderedCoffeRepository orderedCoffeRepository, MailService mailService) {
        this.orderedCoffeRepository = orderedCoffeRepository;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /ordered-coffes} : Create a new orderedCoffe.
     *
     * @param orderedCoffe the orderedCoffe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderedCoffe, or with status {@code 400 (Bad Request)} if the orderedCoffe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ordered-coffes")
    public ResponseEntity<OrderedCoffe> createOrderedCoffe(@RequestBody OrderedCoffe orderedCoffe) throws URISyntaxException {
        log.debug("REST request to save OrderedCoffe : {}", orderedCoffe);
        if (orderedCoffe.getId() != null) {
            throw new BadRequestAlertException("A new orderedCoffe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderedCoffe result = orderedCoffeRepository.save(orderedCoffe);
        return ResponseEntity.created(new URI("/api/ordered-coffes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ordered-coffes/:id} : get the "id" orderedCoffe.
     *
     * @param orderId the id of the orderedCoffe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderedCoffe, or with status {@code 404 (Not Found)}.
     */
    @PostMapping("/ordered-coffes/{orderId}")
    public ResponseEntity sendEmail(@PathVariable String orderId) {
        log.debug("REST request to get OrderedCoffe : {}", orderId);
        System.out.println(orderId);
        List<OrderedCoffe> orderedCoffes = orderedCoffeRepository.findAllByOrderId(orderId);
        System.out.println(orderedCoffes);
        mailService.sendOrderEmail(orderedCoffes);
//        Optional<OrderedCoffe> orderedCoffe = orderedCoffeRepository.findById(id);
        return ResponseEntity.ok(orderId);
    }

    /**
     * {@code PUT  /ordered-coffes} : Updates an existing orderedCoffe.
     *
     * @param orderedCoffe the orderedCoffe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderedCoffe,
     * or with status {@code 400 (Bad Request)} if the orderedCoffe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderedCoffe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ordered-coffes")
    public ResponseEntity<OrderedCoffe> updateOrderedCoffe(@RequestBody OrderedCoffe orderedCoffe) throws URISyntaxException {
        log.debug("REST request to update OrderedCoffe : {}", orderedCoffe);
        if (orderedCoffe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderedCoffe result = orderedCoffeRepository.save(orderedCoffe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderedCoffe.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ordered-coffes} : get all the orderedCoffes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderedCoffes in body.
     */
    @GetMapping("/ordered-coffes")
    public List<OrderedCoffe> getAllOrderedCoffes() {
        log.debug("REST request to get all OrderedCoffes");
        return orderedCoffeRepository.findAll();
    }

    /**
     * {@code GET  /ordered-coffes/:id} : get the "id" orderedCoffe.
     *
     * @param id the id of the orderedCoffe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderedCoffe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ordered-coffes/{id}")
    public ResponseEntity<OrderedCoffe> getOrderedCoffe(@PathVariable Long id) {
        log.debug("REST request to get OrderedCoffe : {}", id);
        Optional<OrderedCoffe> orderedCoffe = orderedCoffeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderedCoffe);
    }

    /**
     * {@code DELETE  /ordered-coffes/:id} : delete the "id" orderedCoffe.
     *
     * @param id the id of the orderedCoffe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ordered-coffes/{id}")
    public ResponseEntity<Void> deleteOrderedCoffe(@PathVariable Long id) {
        log.debug("REST request to delete OrderedCoffe : {}", id);
        orderedCoffeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /ordered-coffes/order/{orderId}} : get all the orderedCoffees by Order Id.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderedCoffees in body.
     */
    @GetMapping(value = "/ordered-coffes/order/{orderId}")
    public List<OrderedCoffe> getAllOrderedCoffesByOrderId(@PathVariable(value="orderId") String orderId) {
        log.debug("REST request to get all OrderedCoffes");
        System.out.println(orderId);
        log.debug("REST request to get all OrderedCoffes{}",orderedCoffeRepository.findAllByOrderId(orderId) );
        return orderedCoffeRepository.findAllByOrderId(orderId);
    }
}
