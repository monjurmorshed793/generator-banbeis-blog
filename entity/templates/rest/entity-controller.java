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
    private final <%= entity.name %>Service navigationService;

    @Override
    @PostMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> create(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()!=null){
            new BadRequestAlertException("New entity id must be null", getClass().getName(), "idnotnull");
        }
        <%= entity.name %> saved<%= entity.name %> = navigationService.createOrUpdate(entity);
        return ResponseEntity
                .ok()
                .body(savedNavigation);
    }

    @Override
    @PutMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> update(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()==null){
            new BadRequestAlertException("Updatable entity id should not be null", getClass().getName(), "idnull");
        }
        <%= entity.name %> updatedNavigation = navigationService.createOrUpdate(entity);
        return ResponseEntity
                .ok()
                .body(updatedNavigation);
    }

    @Override
    @PatchMapping("/<%- convertToLowercase(entity.name) %>")
    public ResponseEntity<<%= entity.name %>> patch(HttpServletRequest httpServletRequest, <%= entity.name %> entity) {
        if(entity.getId()==null){
            new BadRequestAlertException("Updatable entity id should not be null", getClass().getName(), "idnull");
        }
        Optional<<%= entity.name %>> patched<%= entity.name %> = navigationService
                .getById(entity.getId())
                .map(existing<%= entity.name %>->{
                    if(entity.getTitle()!=null)
                        existing<%= entity.name %>.setTitle(entity.getTitle());
                    if(entity.getIcon()!=null)
                        existing<%= entity.name %>.setId(entity.getIcon());
                    if(entity.getRoles()!=null)
                        existing<%= entity.name %>.setRoles(entity.getRoles());
                    if(entity.getRoute()!=null)
                        existing<%= entity.name %>.setRoute(entity.getRoute());
                    return existing<%= entity.name %>;
                })
                .map(navigationService::createOrUpdate);

        return ResponseEntity
                .ok(patched<%= entity.name %>.get());
    }

    @Override
    @GetMapping("/<%- convertToLowercase(entity.name) %>/public/all")
    public ResponseEntity<List<<%= entity.name %>>> getAll() {
        return ResponseEntity
                .ok(navigationService.getAll());
    }

    @Override
    @GetMapping("/<%- convertToLowercase(entity.name) %>/public/{id}")
    public ResponseEntity<<%= entity.name %>> get(@PathVariable String id) {
        if(!navigationService.exists(id))
            throw new BadRequestAlertException("The id doesnot exist", getClass().getName(), "idnotexists");

        return ResponseEntity.ok(navigationService.getById(id).get());
    }

    @Override
    @DeleteMapping("/<%- convertToLowercase(entity.name) %>/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if(!navigationService.exists(id))
            throw new BadRequestAlertException("The id doesnot exist", getClass().getName(), "idnotexists");

        navigationService.delete(id);
        return ResponseEntity.ok().build();
    }
}
