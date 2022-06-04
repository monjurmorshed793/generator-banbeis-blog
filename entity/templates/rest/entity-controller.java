package <%= entity.controllerDirectory %>;

import <%= entity.modelDirectory %>.<%= entity.name %>;
import bd.gov.banbeis.banbeisblog.exceptions.BadRequestAlertException;
import <%= entity.serviceDirectory %>.<%= entity.name %>Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/api")
@RequiredArgsConstructor
public class <%= entity.name %>Controller implements CommonController<<%= entity.name %>, String> {
    private final <%= entity.name %>Service <%- convertToLowercase(entity.name) %>Service;

    @Override
    @PostMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> create(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()!=null){
            new BadRequestAlertException("New entity id must be null", getClass().getName(), "idnotnull");
        }
        <%= entity.name %> saved<%= entity.name %> = <%- convertToLowercase(entity.name) %>Service.createOrUpdate(entity);
        return ResponseEntity
                .ok()
                .body(saved<%= entity.name %>);
    }

    @Override
    @PutMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> update(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()==null){
            new BadRequestAlertException("Updatable entity id should not be null", getClass().getName(), "idnull");
        }
        <%= entity.name %> updated<%= entity.name %> = <%- convertToLowercase(entity.name) %>Service.createOrUpdate(entity);
        return ResponseEntity
                .ok()
                .body(updated<%= entity.name %>);
    }

    @Override
    @PatchMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> patch(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()==null){
            new BadRequestAlertException("Updatable entity id should not be null", getClass().getName(), "idnull");
        }
        Optional<<%= entity.name %>> patched<%= entity.name %> = <%- convertToLowercase(entity.name) %>Service
                .getById(entity.getId())
                .map(existing<%= entity.name %>->{
           <%_ for (const field of fields) { _%>
                 if(entity.get<%- firstLetterUpperCase(field.name) %>() !=null )
                      existing<%= entity.name %>.set<%- firstLetterUpperCase(field.name) %>(entity.get<%- firstLetterUpperCase(field.name) %>());
           <%_ } _%>
                 return existing<%= entity.name %>;
                })
                .map(<%- convertToLowercase(entity.name) %>Service::createOrUpdate);

        return ResponseEntity
                .ok(patched<%= entity.name %>.get());
    }

    @Override
    @GetMapping("/<%- convertToLowercase(entity.name) %>/public/all")
    public ResponseEntity<List<<%= entity.name %>>> getAll() {
        return ResponseEntity
                .ok(<%- convertToLowercase(entity.name) %>Service.getAll());
    }

    @Override
    @GetMapping("/<%- convertToLowercase(entity.name) %>/public/{id}")
    public ResponseEntity<<%= entity.name %>> get(@PathVariable String id) {
        if(!<%- convertToLowercase(entity.name) %>Service.exists(id))
            throw new BadRequestAlertException("The id doesnot exist", getClass().getName(), "idnotexists");

        return ResponseEntity.ok(<%- convertToLowercase(entity.name) %>Service.getById(id).get());
    }

    @Override
    @DeleteMapping("/<%- convertToLowercase(entity.name) %>/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if(!<%- convertToLowercase(entity.name) %>Service.exists(id))
            throw new BadRequestAlertException("The id doesnot exist", getClass().getName(), "idnotexists");

        <%- convertToLowercase(entity.name) %>Service.delete(id);
        return ResponseEntity.ok().build();
    }
}
