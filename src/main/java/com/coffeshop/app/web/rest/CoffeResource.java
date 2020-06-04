package com.coffeshop.app.web.rest;

import com.coffeshop.app.domain.Coffe;
import com.coffeshop.app.repository.CoffeRepository;
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
 * REST controller for managing {@link com.coffeshop.app.domain.Coffe}.
 */
@RestController
@RequestMapping("/api")
public class CoffeResource {

    private final Logger log = LoggerFactory.getLogger(CoffeResource.class);

    private static final String ENTITY_NAME = "coffe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoffeRepository coffeRepository;

    public CoffeResource(CoffeRepository coffeRepository) {
        this.coffeRepository = coffeRepository;
    }

    /**
     * {@code POST  /coffes} : Create a new coffe.
     *
     * @param coffe the coffe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coffe, or with status {@code 400 (Bad Request)} if the coffe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/coffes")
    public ResponseEntity<Coffe> createCoffe(@RequestBody Coffe coffe) throws URISyntaxException {
        log.debug("REST request to save Coffe : {}", coffe);
        if (coffe.getId() != null) {
            throw new BadRequestAlertException("A new coffe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Coffe result = coffeRepository.save(coffe);
        return ResponseEntity.created(new URI("/api/coffes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /coffes} : Updates an existing coffe.
     *
     * @param coffe the coffe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coffe,
     * or with status {@code 400 (Bad Request)} if the coffe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coffe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/coffes")
    public ResponseEntity<Coffe> updateCoffe(@RequestBody Coffe coffe) throws URISyntaxException {
        log.debug("REST request to update Coffe : {}", coffe);
        if (coffe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Coffe result = coffeRepository.save(coffe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coffe.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /coffes} : get all the coffes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coffes in body.
     */
    @GetMapping("/coffes")
    public List<Coffe> getAllCoffes() {
        log.debug("REST request to get all Coffes");
        return coffeRepository.findAll();
    }

    /**
     * {@code GET  /coffes/:id} : get the "id" coffe.
     *
     * @param id the id of the coffe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coffe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/coffes/{id}")
    public ResponseEntity<Coffe> getCoffe(@PathVariable Long id) {
        log.debug("REST request to get Coffe : {}", id);
        Optional<Coffe> coffe = coffeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coffe);
    }

    /**
     * {@code DELETE  /coffes/:id} : delete the "id" coffe.
     *
     * @param id the id of the coffe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/coffes/{id}")
    public ResponseEntity<Void> deleteCoffe(@PathVariable Long id) {
        log.debug("REST request to delete Coffe : {}", id);
        coffeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
