package <%= entity.serviceDirectory %>;

import <%= entity.modelDirectory %>.<%= entity.name %>;
import <%= entity.repositoryDirectory %>.<%= entity.name %>Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class <%= entity.name %>Service implements CommonService<<%= entity.name %>, String> {
    private final <%= entity.name %>Repository <%- convertToLowercase(entity.name) %>Repository;

    @Override
    public <%= entity.name %> createOrUpdate(<%= entity.name %> <%- convertToLowercase(entity.name) %>) {
        return <%- convertToLowercase(entity.name) %>Repository.save(<%- convertToLowercase(entity.name) %>);
    }

    @Override
    public void delete(String id) {
        <%- convertToLowercase(entity.name) %>Repository.deleteById(id);
    }

    @Override
    public List<<%= entity.name %>> getAll() {
        return <%- convertToLowercase(entity.name) %>Repository.findAll();
    }

    @Override
    public Optional<<%= entity.name %>> getById(String id) {
        return <%- convertToLowercase(entity.name) %>Repository.findById(id);
    }

    @Override
    public Boolean exists(String id) {
        return <%- convertToLowercase(entity.name) %>Repository.existsById(id);
    }
}
